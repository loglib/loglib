"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Overview } from "./overview";
import React from "react";

export function OverviewComponent() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Visitors</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Overview />
      </CardContent>
    </Card>
  );
}
