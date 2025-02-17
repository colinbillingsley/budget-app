import React, { Dispatch, SetStateAction } from "react";
import { Color } from "./CategoryForm";

interface ColorPickerProps {
	selectedColor: Color | null;
	setSelectedColor: Dispatch<SetStateAction<Color | null>>;
}

const defaultColors = [
	{ title: "Red", hex: "#FF0000", isSelected: false },
	{ title: "Orange", hex: "#FF8C00", isSelected: false },
	{ title: "Yellow", hex: "#FFD700", isSelected: false },
	{ title: "Green", hex: "#008000", isSelected: false },
	{ title: "Teal", hex: "#008080", isSelected: false },
	{ title: "Blue", hex: "#0000FF", isSelected: false },
	{ title: "Purple", hex: "#800080", isSelected: false },
	{ title: "Pink", hex: "#FF69B4", isSelected: false },
	{ title: "Brown", hex: "#A52A2A", isSelected: false },
	{ title: "Black", hex: "#000000", isSelected: false },
	{ title: "Gray", hex: "#808080", isSelected: false },
];

const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
	function handleColorSelect(newSelectedColor: Color, e: any) {
		e.preventDefault();
		// if there is an already selected color, reset it to not selected when new color chosen
		if (selectedColor) {
			selectedColor.isSelected = false;
		}

		// set isSelected for new color chose to true
		newSelectedColor.isSelected = true;
		// set selectedColor to new color
		setSelectedColor(newSelectedColor);
	}

	return (
		<div>
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(2rem,2rem))] gap-4">
				{defaultColors.map((color, index) => (
					<li key={`color-${index}`}>
						<button
							style={{ backgroundColor: color.hex }}
							onClick={(e) => handleColorSelect(color, e)}
							className={`size-8 rounded-md ring-2 ring-offset-4 ${
								color.isSelected ? "ring-blue-500" : "ring-transparent"
							} transition-all`}
						></button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ColorPicker;
