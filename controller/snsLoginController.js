import axios from 'axios';

export const snsLoginCallback = async(req, res) =>{
  const { code, state } = req.body; 
  const provider = req.params.provider;
  
  try {
    if(provider === 'naver'){
      const tokenRes = await axios.post('https://nid.naver.com/oauth2.0/token', null,{
                                          params: {
                                            grant_type: 'authorization_code',
                                            client_id: 'nd3jd_Q53Vfna4fdLlgx',
                                            client_secret: 'FAXVytxIqG',
                                            code,
                                            state,
                                          },
                                        });

      const { access_token } = tokenRes.data;
  
      const userInfoRes = await axios.get('https://openapi.naver.com/v1/nid/me', {
                                            headers: {
                                              Authorization: `Bearer ${access_token}`,
                                            },
                                          });
      const userData = userInfoRes.data.response;  
      return res.json(userData);
    }else if (provider === 'kakao') {
      const tokenRes = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: '3f5c49e05800584ba496c54e74152ab3',
            redirect_uri: 'http://localhost:3000/signup/redirect/kakao',
            code,
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      const { access_token } = tokenRes.data;

      const userInfoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const kakaoAccount = userInfoRes.data.kakao_account;

      const userData = {
        name: kakaoAccount?.profile?.nickname || '',
        email: kakaoAccount?.email || '',
        mobile: kakaoAccount?.phone_number || '',
      };

      return res.json(userData);
    }

    return res.status(400).json({ error: '지원되지 않는 provider' });

  } catch (error) {
    console.error(`[${provider}] 연동 실패:`, error.response?.data || error.message);
    return res.status(500).json({ error: `${provider} 연동 실패` });
  }
};