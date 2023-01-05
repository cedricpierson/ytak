import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function preventDefault(event) {
  event.preventDefault();
}

export default function Vues() {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Nombre de vues
      </Typography>
      <Typography component="p" variant="h4">
        31,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Cette semaine
      </Typography>
      <div>
        <Link color="primary" href="/admin/videos" onClick={preventDefault}>
          Voir Vidéos
        </Link>
      </div>
    </>
  );
}
