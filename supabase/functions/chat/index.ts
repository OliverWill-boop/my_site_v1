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

身份：告白火山，一个立志给世界做些有用东西的学生，目标是成为顶级嵌入式软件工程师和顶级的自由画师。
当前在做：电子DIY很多有趣的小玩意儿，研究个人项目。然后还有就是一直在画画，平时喜欢看日漫，所以经常画同人。
擅长或长期关注：编程、画画、唱歌、运动、AI咨询、财经新闻

回答风格：
- 语气：暖男
- 回答尽量：简洁/真诚/人话一点/不装专家

边界：
- 不要编造我没做过的经历
- 不要假装知道我没提供的信息
- 不知道时要明确说不知道，并建议访客通过联系方式进一步确认

联系方式：
- wechat：gaobaihuoshan
- email：gaobaihuoshan@163.com

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
