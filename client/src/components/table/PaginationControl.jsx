import React,{useState,useEffect} from 'react'

const PaginationControl = ({slicedRowData,activeIndex,setActiveIndex}) => {
  const [pageIndex,setPageIndex] = useState(0);
  // const [activeIndex,setActiveIndex] = useState(0);
  useEffect(() => {
		if (slicedRowData.length !== 0) {
			if (pageIndex < slicedRowData.length) {
				setActiveIndex(pageIndex);
			} else {
				setPageIndex(slicedRowData.length);
			}
		}
	}, [pageIndex]);
  return (
    <div className="flex flex-row-reverse items-center justify-between px-5">
				<div className="text-slate-500 text-sm">
					Showing result {activeIndex + 1} to {slicedRowData.length}
				</div>
				<div className="flex">
					<button
						className="px-2 text-slate-500 text-lg border border-slate-300 border-e-0 tracking-tighter disabled:text-slate-300"
						onClick={() => {
							setActiveIndex((current) => current - 1);
							if (pageIndex > 0) {
								setPageIndex((p) => p - 1);
							}
						}}
						disabled={activeIndex == 0}
					>
						&lt;&lt;
					</button>
					{slicedRowData.length !== 0 &&
						slicedRowData.map((value, index) =>
							slicedRowData.length < 5 ? (
								<button
									className={`p-2 px-4 border border-e-0 border-slate-400 text-slate-500 ${
										index == activeIndex
											? "bg-indigo-500 text-white"
											: ""
									}`}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>
							) : (
								""
							)
						)}

					{slicedRowData.length > 5 && (
						<>
							<button
								className={`p-2 px-4 border border-e-0 border-slate-400 text-slate-500 ${
									pageIndex + 1 == activeIndex
										? "bg-indigo-500 text-white"
										: ""
								}`}
								onClick={() => setActiveIndex(pageIndex + 1)}
							>
								{pageIndex + 1}
							</button>

							<button
								className={`p-2 px-4 border border-e-0 border-slate-400 text-slate-500 ${
									pageIndex + 2 == activeIndex
										? "bg-indigo-500 text-white"
										: ""
								}`}
								onClick={() => setActiveIndex(pageIndex + 2)}
							>
								{pageIndex + 3}
							</button>

							<button
								className={`p-2 px-4 border border-e-0 border-slate-400 text-slate-500 ${
									pageIndex + 3 == activeIndex
										? "bg-indigo-500 text-white"
										: ""
								}`}
								onClick={() => setActiveIndex(pageIndex + 3)}
							>
								{pageIndex + 4}
							</button>

							<button
								className={`p-2 px-4 border border-e-0 border-slate-400 text-slate-500 disabled:text-slate-400 `}
								onClick={() => {
									if (pageIndex <= slicedRowData.length) {
										setPageIndex((p) => p + 2);
									}
								}}
								disabled={pageIndex > slicedRowData.length}
							>
								...
							</button>
						</>
					)}
					<button
						className="px-2 text-slate-500 text-lg border border-slate-400 tracking-tighter disabled:text-slate-300"
						onClick={() => {
							setActiveIndex((current) => current + 1);
							if (pageIndex <= slicedRowData.length - 5) {
								setPageIndex((p) => p + 1);
							}
							// setPageIndex((p) => p + 1);
						}}
						disabled={activeIndex == slicedRowData.length - 1}
					>
						&gt;&gt;
					</button>
				</div>
			</div>
  )
}

export default PaginationControl
