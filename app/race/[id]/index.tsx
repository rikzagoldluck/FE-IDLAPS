"use client";
import { SyntheticEvent, useState, useRef } from "react";
import TableBody from "./TableBody";
import SelectRiderNote from "@/components/SelectRiderNote";
import { RunTypeConst } from "@/services/riders/data-type";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function index({ id }: { id: number }) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [noteInternal, setNoteInternal] = useState<string>("");

  const [buttonState, setButtonState] = useState("");

  function handleSelect(e: SyntheticEvent) {
    const { value } = e.currentTarget;
    setNoteInternal(value);
    setTimeout(() => {
      setNoteInternal("");
    }, 1000);
  }

  const handleClick = (button: string) => {
    setButtonState(button + "-" + Date.now());
  };
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: categoryName,
    sheet: "RACE RESULT",
  });

  return (
    <div className="py-10 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-center justify-between mb-6">
        <h1 className="text-center text-4xl">{categoryName}</h1>
        <div
          className="flex gap-3 md:justify-center mx-auto md:mx-0"
          id="button-container"
        >
          <select
            className="select w-48"
            onChange={handleSelect}
            value={noteInternal}
          >
            <option value="">SELECT ACTION</option>
            {Object.keys(RunTypeConst).map((key) => {
              const value = RunTypeConst[key as keyof typeof RunTypeConst];
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
          <button
            className="btn btn-outline btn-warning"
            onClick={() => handleClick("clear")}
          >
            CLEAR
          </button>

          <button className="btn btn-outline btn-success" onClick={onDownload}>
            {" "}
            Export excel{" "}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <TableBody
          id={id}
          onCategoryNameChange={(cat) => {
            setCategoryName(cat);
          }}
          note={noteInternal}
          buttonState={buttonState}
          tableRef={tableRef}
        />
      </div>
    </div>
  );
}
