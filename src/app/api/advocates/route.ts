import { advocates } from "../../../db/schema";
import { ilike, sql, or } from "drizzle-orm";
import type { NextRequest } from "next/server";
import db from "../../../db";

const searchableColumns = [
  advocates.firstName,
  advocates.lastName,
  advocates.city,
  advocates.degree,
];

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const pageSize = parseInt(
    request.nextUrl.searchParams.get("pageSize") || "10"
  );
  const search = request.nextUrl.searchParams.get("search");

  try {
    if (!db) {
      throw new Error("Database connection not available");
    }

    let query = db.select().from(advocates);
    let totalQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(advocates);

    if (search) {
      const searchTerms = `%${search.toLowerCase()}%`;

      const conditions = searchableColumns.map((column) =>
        ilike(column, sql.param(searchTerms))
      );

      const whereClause = or(...conditions);
      query = query.where(whereClause);
      totalQuery = totalQuery.where(whereClause);
    }

    const totalResult = await totalQuery.execute();
    const total = totalResult[0]?.count || 0;

    const offset = (page - 1) * pageSize;

    query = query
      .offset(offset)
      .limit(Number(pageSize))
      .orderBy(advocates.lastName);

    const result = await query.execute();

    return Response.json({
      data: result,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
