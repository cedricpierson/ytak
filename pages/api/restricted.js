import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    res.send({
      content: 'Ce contenu est protégé. Vous y avez accès car vous êtes inscrit.',
    });
  } else {
    res.send({
      error: 'Vous devez vous inscrire pour accéder à ce contenu.',
    });
  }
};
