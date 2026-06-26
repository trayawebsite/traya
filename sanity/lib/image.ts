import createImageUrlBuilder, {
  type SanityImageSource
} from '@sanity/image-url';
import {dataset, projectId} from '../env';

const builder = createImageUrlBuilder({projectId, dataset});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

const FILE_REF_RE = /^file-([a-f0-9]+)-(\w+)$/;

export function fileUrlForRef(ref: string): string | null {
  const m = FILE_REF_RE.exec(ref);
  if (!m) return null;
  const [, id, ext] = m;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}
