import React from "react";

const DetailValue = ({
  keyName,
  value,
}: {
  keyName: string;
  value: number | string;
}) => {
  return (
    <div className="p-2 flex justify-between sm:grid grid-cols-2 sm:grid-cols-3  ">
      <dt className="font-semibold capitalize text-slate-600">{keyName}</dt>
      <dd className="sm:col-span-2 text-slate-500">{value}</dd>
    </div>
  );
};

export default DetailValue;
