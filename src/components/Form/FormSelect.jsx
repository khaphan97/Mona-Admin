import { Select } from "antd";
import React from "react";

function FormSelect(props) {
	const { data } = props;

	const { Option } = Select;

	const optionsElement = data.map((option, index) => {
		return <Option key={index} value={option.id}>{option.name}</Option>;
	});

	function onChange(value) {
		console.log(`selected ${value}`);
	}

	function onBlur() {
		console.log("blur");
	}

	function onFocus() {
		console.log("focus");
	}

	function onSearch(val) {
		console.log("search:", val);
	}

	return (
		<Select
			showSearch
			style={{ width: 200 }}
			placeholder="Select a person"
			optionFilterProp="children"
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			onSearch={onSearch}
			filterOption={(input, option) =>
				option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		>
			{optionsElement}
		</Select>
	);
}

export default FormSelect;
