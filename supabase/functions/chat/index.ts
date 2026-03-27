// 聊天Edge Function - 调用文心大模型API
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

Deno.serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages }: ChatRequest = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: '消息不能为空' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 获取API密钥
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API密钥未配置' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 添加系统提示词（数字分身的知识库）
    const systemMessage: Message = {
      role: 'system',
      content: `你是告白火山的数字分身，请基于以下信息回答访客的问题：

身份：学生
当前在做：积累个人项目，专注于AI应用和电子DIY
擅长方向：具身智能、财经新闻、AI应用
兴趣爱好：编程、运动、音乐、做有意思的小玩意儿
个人特点：可以把复杂的知识用人话讲出来

回答风格：
- 友好、自然、有亲和力
- 简洁明了，避免过于专业的术语
- 如果访客询问联系方式，可以引导他们留言或说明获取方式
- 如果不确定的信息，诚实地表示不清楚

请用第一人称回答，就像告白火山本人在回复一样。`,
    };

    // 构建完整的消息列表
    const fullMessages = [systemMessage, ...messages];

    // 调用文心大模型API
    const response = await fetch(
      'https://app-aji3hipo24n7-api-zYkZz8qovQ1L-gateway.appmiaoda.com/v2/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: fullMessages,
          enable_thinking: false,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API错误:', errorData);
      return new Response(
        JSON.stringify({ error: errorData.error?.message || '调用AI服务失败' }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 返回流式响应
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('处理请求时出错:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
