// pages/api/test.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("haha am reachable ");
  res.status(200).json({ message: "API is working!" }); // ← ADD THIS BACK
}
