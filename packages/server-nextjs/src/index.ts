import type { NextApiRequest, NextApiResponse } from "next";
import { LogLibOptions, internalRouter } from "@loglib/core";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const createServer = (options: LogLibOptions) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method) {
      return res.status(400).json({ message: "bad request" });
    }
    if (options.cors) {
      res.setHeader("Access-Control-Allow-Origin", options.cors.origin);
    }
    if (typeof req.body === "string") {
      try {
        req.body = JSON.parse(req.body);
      } catch {
        req.body = {};
      }
    }
    if (req.method === "POST") {
      const response = await internalRouter(req, options);
      return res.status(response.code).json({
        message: response.message,
        data: response.data,
        code: response.code,
      });
    } else if (req.method === "GET") {
      const response = await internalRouter(req, options);
      return res.status(response.code).json({
        message: response.message,
        data: response.data,
        code: response.code,
      });
    }
  };
};

const createServerRoutes = (options: LogLibOptions) => {
  const fn = async (req: Request) => {
    let body = {};
    if (req.method === "POST") {
      body = await req.json();
    }
    const header = Object.fromEntries(new Headers(req.headers));
    const query = new URLSearchParams(req.url.split("?")[1]);
    const queryObject = Object.fromEntries(query.entries());
    const internalResponse = await internalRouter(
      {
        body,
        headers: header,
        method: req.method,
        query: queryObject,
        cookies: cookies(),
      },
      options,
    );
    return new NextResponse(
      JSON.stringify({
        data: internalResponse.data,
        message: internalResponse.message,
        code: internalResponse.code,
      }),
      {
        status: internalResponse.code,
        headers: {
          "Access-Control-Allow-Origin": options.cors?.origin || "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  };
  async function OPTIONS(_: Request) {
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": options.cors?.origin || "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
    return response;
  }
  return { POST: fn, GET: fn, OPTIONS };
};
export { createServer, createServerRoutes };
