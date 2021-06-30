import React from "react";
import { DiamonLoading } from "react-loadingg";

export default function Loading() {
  return (
    <div className={"spinner"}>
      <DiamonLoading color="#cd3827" />
    </div>
  );
}
