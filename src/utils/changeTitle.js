export function Title({ title, metaDescription }) {
  title = title || "Default title";
  metaDescription = metaDescription || "Default description";

  document.title = title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", metaDescription);
}
