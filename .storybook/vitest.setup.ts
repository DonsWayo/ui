import { setProjectAnnotations } from '@storybook/sveltekit';
import * as previewAnnotations from './preview';

const projectAnnotations = setProjectAnnotations(previewAnnotations);

beforeAll(projectAnnotations.beforeAll);
