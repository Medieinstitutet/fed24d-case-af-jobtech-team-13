import { DigiMediaImage } from "@digi/arbetsformedlingen-react";
import styled from "styled-components";

type StyledMediaImageProps = {
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';
}

export const StyledMediaImage = styled(DigiMediaImage)<StyledMediaImageProps>`

  .digi-media-image__image {
    object-fit: ${props => props.objectFit || 'contain'};
  }
`;