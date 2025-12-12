// src/utils/response.js
export const success = (res, message = 'success', data = null) => {
  return res.json({ success: true, message, data });
};

export const error = (res, message = 'error', code = 400) => {
  return res.status(code).json({ success: false, message });
};
