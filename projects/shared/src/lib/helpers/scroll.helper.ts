export function scrollToElement(elementId: string, milliseconds = 200): void {
  setTimeout(() => {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, milliseconds);
}
