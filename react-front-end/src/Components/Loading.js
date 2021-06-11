import React from "react";
import { DiamonLoading } from "react-loadingg";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <div className={"spinner"}>
      <DiamonLoading />
    </div>
  );
}
