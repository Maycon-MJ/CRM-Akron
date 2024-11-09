import React from 'react';
import { FileIcon, Download } from 'lucide-react';

interface FilePreviewProps {
  file: {
    name: string;
    url: string;
    type: string;
  };
}

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  const isImage = file.type.startsWith('image/');

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        {isImage ? (
          <img
            src={file.url}
            alt={file.name}
            className="w-10 h-10 object-cover rounded"
          />
        ) : (
          <FileIcon className="w-6 h-6 text-gray-500" />
        )}
        <span className="text-sm text-gray-700 truncate">{file.name}</span>
      </div>
      <div className="flex space-x-2">
        {isImage && (
          <button
            onClick={() => window.open(file.url, '_blank')}
            className="text-blue-600 hover:text-blue-800"
          >
            Visualizar
          </button>
        )}
        <a
          href={file.url}
          download={file.name}
          className="flex items-center text-green-600 hover:text-green-800"
        >
          <Download className="w-4 h-4 mr-1" />
          Baixar
        </a>
      </div>
    </div>
  );
};

export default FilePreview;