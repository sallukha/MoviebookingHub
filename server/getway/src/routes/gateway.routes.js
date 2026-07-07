 import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { SERVICES } from "../config/services.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("GATEWAY RECEIVED:", req.method, req.originalUrl);
  next();
});

// AUTH SERVICE
router.use(
  "/auth",
  createProxyMiddleware({
    target: SERVICES.AUTH,
    changeOrigin: true
  })
);

// BOOKING SERVICE
router.use(
  "/bookings",
  createProxyMiddleware({
    target: SERVICES.BOOKINGS,
    changeOrigin: true
  })
);

// MOVIE SERVICE (FILE UPLOAD SUPPORTED)
router.use(
  "/movies",
  createProxyMiddleware({
    target: SERVICES.MOVIE,
    changeOrigin: true,
    ws: true,

    /** VERY IMPORTANT FOR FILE UPLOAD */
    preserveHeaderKeyCase: true,
    proxyTimeout: 500000,
    timeout: 500000,

    /** Forward raw stream (multipart-form-data) */
    onProxyReq: (proxyReq, req, res) => {
      if (!req.body || !Object.keys(req.body).length) return;

      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  })
);

router.use(
  "/notify",
  createProxyMiddleware({
    target: SERVICES.NOTIFICATION,
    changeOrigin: true
  })
);

router.use(
  "/payment",
  createProxyMiddleware({
    target: SERVICES.PAYMENT,
    changeOrigin: true
  })
);
export default router;
