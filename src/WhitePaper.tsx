import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

let whitePaper =  require("./file/whitePaperInfo.pdf");

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const  WhitePaper: React.FC = (props) =>{
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }:{numPages:any}) => {
    setNumPages(numPages);
  };

  const clicked = ({ pageNumber }:{pageNumber:string}) => {
    console.log(pageNumber);
  };

  return (
    <div className="view">
      <div className="pageContainer">
        <Document
          file={whitePaper}
          onLoadSuccess={onDocumentLoadSuccess}
          onItemClick={clicked}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div className="pdf-page-container" key={`pdfpage${index + 1}`}>
              <Page
                className="pdf-page"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
              <p className="pagenum" key={`pagenum+${index + 1}`}></p>
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

export default WhitePaper;
