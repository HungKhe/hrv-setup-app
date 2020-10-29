export default {
    response_mode: "form_post",
    url_authorize: "https://accounts.haravan.com/connect/authorize",
    url_connect_token: "https://accounts.haravan.com/connect/token",
    grant_type: "authorization_code",
    nonce: "asdfasdgd",
    response_type: "code id_token",
    app_id: "c448bbc0fc9d71b6d6f3ce84dc111857",
    app_secret:
        "0859c071d0443bc059ce24fe5173f0b23b2153eb0a0d9ee6cb15c229763a7880",
    scope_login: "openid profile email org userinfo",
    scope:
        "openid profile email org userinfo grant_service com.read_products",
    login_callback_url: "http://localhost:8888/api/oauth/login",
    install_callback_url: "http://localhost:8888/api/oauth/grandservice",
    webhook: {
        hrVerifyToken: "bOL3XFfZabhKe6dnJfCJuTAfi37dFchQ", //https://randomkeygen.com/ (CodeIgniter Encryption Keys)
        subscribe: "https://webhook.haravan.com/api/subscribe",
    },
};
