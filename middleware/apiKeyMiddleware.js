// middleware/apiKeyMiddleware.js
const apiKeys = [
    'backend-api',
    'purelife'
  ];
  
  function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }
    
    if (apiKeys.includes(apiKey)) {
      next();
    } else {
      res.status(403).json({ error: 'Invalid API key' });
    }
  }
  
module.exports = apiKeyMiddleware;
  