const openPopupButton = document.getElementById("openPopup");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const closePopupButton = document.getElementById("closePopup");
const markdownContent = document.getElementById("markdownContent");

async function loadMarkdown() {
  try {
    const response = await fetch("Copyright.md");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error("Error loading markdown:", error);
    return "Error loading content";
  }
}

function renderMarkdown(markdown) {
  // convert headers
  // idk it just dose not work

  // convert links (self links)
  markdown = markdown.replace(
    /\<(.*?)\>/g,
    '<a target="_blank" href="$1">$1</a>'
  );

  // convert links
  markdown = markdown.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );

  // convert bold and underlined text as headline replacement
  markdown = markdown.replace(
    /__(.*?)\*\*(.*?)__\*\*/g,
    "<big><strong>$2</strong></big>"
  );

  // convert bold text
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // convert italic text
  markdown = markdown.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // convert underlined text
  markdown = markdown.replace(/__(.*?)__/g, "<u>$1</u>");

  // handle line breaks
  markdown = markdown.replace(/\n/g, "<br>");

  // Convert blockquotes
  // can't get them to work either

  return markdown;
}

openPopupButton.addEventListener("click", async () => {
  const markdown = await loadMarkdown();
  markdownContent.innerHTML = renderMarkdown(markdown);
  popup.style.display = "block";
  overlay.style.display = "block";
});

closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});
