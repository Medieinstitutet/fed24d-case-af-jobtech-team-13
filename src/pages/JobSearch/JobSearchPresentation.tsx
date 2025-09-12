import { DigiLayoutBlock, DigiTypography } from "@digi/arbetsformedlingen-react";
import { transformApiJobToListItem } from "../../api/transformers";
import type { ApiJobHit } from "../../api/types";
import { testObject } from "./testObject";
import { LayoutBlockContainer, LayoutBlockVariation } from "@digi/arbetsformedlingen";

export const JobSearchPresentation = () => {

  const searchData = testObject.hits.map(hit => 
    transformApiJobToListItem(hit as ApiJobHit)
  );

  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.TRANSPARENT} afContainer={LayoutBlockContainer.NONE}>
        <h1>Kalle</h1>
      </DigiLayoutBlock>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.SECONDARY} afContainer={LayoutBlockContainer.STATIC}>
        <DigiTypography>
          
          <h1>Kalle</h1>



        </DigiTypography>
      </DigiLayoutBlock>
      
    </>
  );
};


// <>
//   {searchData.map((job) => (
//     <h2 key={job.id}>{job.title}</h2>
//   ))}
// </>