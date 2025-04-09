<?php
// Adresse e-mail de destination
$to = "contact@qolibri-cie.com"; // Remplace par ta vraie adresse

// Sécurisation des champs
$nom = htmlspecialchars($_POST['nom'] ?? '');
$prenom = htmlspecialchars($_POST['prenom'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$telephone = htmlspecialchars($_POST['telephone'] ?? '');
$societe = htmlspecialchars($_POST['societe'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

$subject = "Nouveau message depuis le formulaire de contact";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

// Construction du corps du mail
$body = "Message de : $prenom $nom\n";
$body .= "Email : $email\n";
$body .= "Téléphone : $telephone\n";
$body .= "Société : $societe\n\n";
$body .= "Message :\n$message\n";

// Gestion de pièce jointe simple
if (isset($_FILES['fichier']) && $_FILES['fichier']['error'] == 0) {
  $fileTmpPath = $_FILES['fichier']['tmp_name'];
  $fileName = basename($_FILES['fichier']['name']);
  $fileType = mime_content_type($fileTmpPath);
  $fileContent = chunk_split(base64_encode(file_get_contents($fileTmpPath)));

  $boundary = md5(time());
  $headers = "From: $email\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

  $body = "--$boundary\r\n";
  $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
  $body .= "Message de : $prenom $nom\nEmail : $email\nTéléphone : $telephone\nSociété : $societe\n\n$message\n";
  $body .= "--$boundary\r\n";
  $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
  $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
  $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
  $body .= "$fileContent\r\n";
  $body .= "--$boundary--";
}

// Envoi du mail
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
  echo "Message envoyé avec succès.";
} else {
  echo "Erreur lors de l'envoi du message.";
}
?>
