import { IoLanguageOutline } from 'react-icons/io5';
import { FcPicture } from 'react-icons/fc';
import { FcBiomass, FcBiotech, FcGlobe, FcLibrary } from 'react-icons/fc';
import { RiFontSize } from 'react-icons/ri';
import { TfiWrite } from 'react-icons/tfi';
import { BiMath } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import { TbAtom } from 'react-icons/tb';

export const getSubjectIcon = (name: string) => {
  switch (name) {
    case 'gramática':
      return <RiFontSize />;

    case 'redação':
      return <TfiWrite />;

    case 'linguas estrangeiras':
      return <IoLanguageOutline />;

    case 'história':
      return <FcLibrary />;

    case 'química':
      return <FcBiomass />;

    case 'biologia':
      return <FcBiotech />;
    case 'geografia':
      return <FcGlobe />;
    case 'matemática':
      return <BiMath />;
    case 'artes':
      return <FcPicture />;
    case 'literatura':
      return <BsBook />;
    case 'física':
      return <TbAtom />;
  }
};
