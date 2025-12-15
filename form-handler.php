<?php
// Enable error reporting during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



// ✅ Zoho Flow Webhook URL
    $url = "https://flow.zoho.com/893075634/flow/webhook/incoming?zapikey=1001.72f65c6d9c22a6c0792407636d42add8.74f15e3dc1f801593cfc19ff5e1c2f1e&isdebug=false";



// Get form fields
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$city = $_POST['city'] ?? '';
$experience = $_POST['experience'] ?? '';
$course = $_POST['course'] ?? '';

// Get UTM values from hidden fields
$utm_source = $_POST['utm_source'] ?? 'N/A';
$utm_medium = $_POST['utm_medium'] ?? 'N/A';
$utm_campaign = $_POST['utm_campaign'] ?? 'N/A';
$utm_term = $_POST['utm_term'] ?? 'N/A';
$utm_content = $_POST['utm_content'] ?? 'N/A';
$utm_id = $_POST['utm_id'] ?? 'N/A';

$redirect = $_POST['redirect'] ?? 'thankyou.html';

// Build message content
$content = "New Form Submission:\n\n";
$content .= "Name: $name\n";
$content .= "Email: $email\n";
$content .= "Phone: $phone\n";
$content .= "City: $city\n";
$content .= "Experience: $experience\n";
$content .= "Course: $course\n\n";
$content .= "UTM Source: $utm_source\n";
$content .= "UTM Medium: $utm_medium\n";
$content .= "UTM Campaign: $utm_campaign\n";
$content .= "UTM Term: $utm_term\n";
$content .= "UTM Content: $utm_content\n";
$content .= "UTM ID: $utm_id\n";
$content .= "----------------------------------\n";

// 1. Send Email
$to = "agp7005@gmail.com";
$subject = "New Lead - Website Form Submission";
$headers = "From: no-reply@lamourinstituteofbeauty.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($to, $subject, $content, $headers);

// 2. Append to text file
file_put_contents("form-submissions.txt", $content, FILE_APPEND);

// 3. Send to Zoho Flow
$zoho_payload = json_encode([
    "FullName" => $name,
    "Email" => $email,
    "Phone" => $phone,
    "City" => $city,
    "Experience" => $experience,
    "Course" => $course,
    "utm_source" => $utm_source,
    "utm_medium" => $utm_medium,
    "utm_campaign" => $utm_campaign,
    "utm_term" => $utm_term,
    "utm_content" => $utm_content,
    "utm_id" => $utm_id
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, $zoho_payload);
curl_exec($ch);
curl_close($ch);

// 4. Redirect to thank you page
header("Location: $redirect");
exit;
?>
