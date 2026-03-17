// src/test-db.ts
import { db } from "./database/knex";
async function test() {
  const result = await db.raw("SELECT 1+1 AS result");
  console.log(result);
}

test();