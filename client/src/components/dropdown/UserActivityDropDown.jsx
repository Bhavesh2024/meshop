import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const UserActivityDropDown = ({
	children,
	activityList,
	open,
	style,
	classes,
	refs,
	parentId,
}) => {
	console.log(document.getElementById(refs))
	return createPortal(
		open && (
			<div className={classes} style={style} ref={refs}>
				{activityList ? (
					<ul>
						{activityList.map((value) => (
							<>
								<li>
									<Link to={`${value.link}`}>
										{value.item}
									</Link>
								</li>
							</>
						))}
					</ul>
				) : (
					children
				)}
			</div>
		),
		document.getElementById('dropdown-root')
	);
};

export default UserActivityDropDown;
