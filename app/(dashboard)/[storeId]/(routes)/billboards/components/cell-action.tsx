"use client";

import React from "react";
import { BillboardColumn } from "./columns";

interface CellActionProps {
  data: BillboardColumn
}

const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  return (
    <section>
      Action
    </section>
  )
};

export default CellAction;