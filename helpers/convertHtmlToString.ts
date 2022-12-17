export default function convertHtmlToString(text:string){
  return text
  .replace(/[\n]/gm, "")
  .replaceAll("<p>","\n")
  .replaceAll("</p>","")
  .replaceAll("<li>","")
  .replaceAll("</li>","")
  .replaceAll("<br>","\n")
  .replaceAll("<b>","")
  .replaceAll("</b>","\n")
  .replaceAll("<br />","\n")
  .replaceAll("<ul>","")
  .replaceAll("</ul>","")
  .replaceAll("   ","")
  .replaceAll(" &amp;","")
}