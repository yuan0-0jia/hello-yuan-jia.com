import Button from "./Button";

// Generate Microlink screenshot URL for external websites
function getMicrolinkScreenshot(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url`;
}

// Check if URL is external (starts with http/https)
function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function Project({
  header,
  desc,
  to,
  image,
  previewUrl,
  reverse,
  button,
}: {
  header: string;
  desc: string;
  to: string;
  image: string;
  previewUrl?: string; // Separate URL for screenshot
  reverse: boolean;
  button: string;
}) {
  // Determine the image source:
  // 1. Use uploaded thumbnail if available
  // 2. Use Microlink screenshot if previewUrl is provided and external
  // 3. Show placeholder if neither
  const hasUploadedImage = image && image.length > 0;
  const canUseMicrolink =
    !hasUploadedImage && !!previewUrl && isExternalUrl(previewUrl);
  const imageSrc = hasUploadedImage
    ? image
    : canUseMicrolink
    ? getMicrolinkScreenshot(previewUrl)
    : null;

  return (
    <section
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } my-8 md:my-12 justify-center items-center gap-6 md:gap-10 lg:gap-14 max-w-6xl mx-auto px-4 md:px-12 card-hover p-6 md:p-8 bg-cream/50 dark:bg-warmGray-800/30 vintage-border rounded-sm`}
    >
      {/* Content */}
      <div className="max-w-md text-center md:text-left">
        <header className="relative">
          <div className="w-12 h-px bg-sepia-300 dark:bg-sepia-600 mb-4 mx-auto md:mx-0" />
          <h3 className="font-typewriter text-xl md:text-2xl text-warmGray-800 dark:text-cream tracking-wide">
            {header}
          </h3>
        </header>
        <p className="mt-4 mb-6 font-typewriter text-sm md:text-base text-warmGray-700 dark:text-warmGray-200 leading-loose tracking-wide">
          {desc}
        </p>
        <Button type="secondary" to={to}>
          {button}
        </Button>
      </div>

      {/* Image with vintage styling - natural size, no cropping */}
      {imageSrc ? (
        <div className="w-full md:w-auto md:max-w-[500px] img-vintage rounded-sm overflow-hidden vintage-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={header} src={imageSrc} className="w-full h-auto" />
        </div>
      ) : (
        <div className="w-full md:w-96 h-56 md:h-64 flex items-center justify-center bg-parchment dark:bg-warmGray-800 rounded-sm vintage-border">
          <span className="font-typewriter text-warmGray-400 dark:text-warmGray-500">
            No image available
          </span>
        </div>
      )}
    </section>
  );
}
