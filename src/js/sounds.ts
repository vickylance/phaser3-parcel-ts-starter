import Mp3Sounds from '../../assets/audio/**/*.mp3';
import OggSounds from '../../assets/audio/**/*.ogg';

import { iterate } from './utils/utils';

export default {
  mp3Sounds: Object.assign(...iterate(Mp3Sounds, '')),
  oggSounds: Object.assign(...iterate(OggSounds, '')),
};
