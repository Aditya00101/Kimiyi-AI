
import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Input } from "@/components/ui/input"

interface LogicNodeData {
  logicType?: string;
  value?: string;
  onChange?: (params: { logicType: string; value: string }) => void;
}

const LogicNode: React.FC<NodeProps<LogicNodeData>> = ({ data }) => {
  const [logicType, setLogicType] = useState(data.logicType || 'condition');
  const [value, setValue] = useState(data.value || '');

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setLogicType(newValue);
    if (data.onChange) {
      data.onChange({ logicType: newValue, value });
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (data.onChange) {
      data.onChange({ logicType, value: e.target.value });
    }
  };

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4 shadow-md min-w-[250px]">
      <div className="flex items-center justify-center mb-2">
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
      </div>
      <div className="text-center font-medium mb-2">Logic</div>
      
      <div className="space-y-3">
        <select
          value={logicType}
          onChange={handleTypeChange}
          className="w-full border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="condition">Condition</option>
          <option value="set">Set Variable</option>
          <option value="component">Component</option>
          <option value="end">End</option>
        </select>

        <Input
          type="text"
          value={value}
          onChange={handleValueChange}
          placeholder={logicType === 'condition' ? 'Enter condition' : 
            logicType === 'set' ? 'Variable name' :
            logicType === 'component' ? 'Component name' : ''}
          className="w-full"
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="b"
        className="w-3 h-3 top-0 bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="w-3 h-3 bottom-0 bg-blue-500"
      />
    </div>
  );
};

export default LogicNode;
