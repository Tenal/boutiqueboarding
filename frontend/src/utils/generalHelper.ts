/**
 * Adds hyperlinks to specific patterns within a given text.
 * - Replaces standalone "boutiqueboarding" with an Instagram hyperlink.
 * - Replaces "boutiqueboardingco@gmail.com" with a mailto hyperlink.
 * @param text - The input string to process.
 * @returns The processed string with added hyperlinks.
 */
export const addHyperlinks = (text: string): string => {
    const replacedWithIgLink = text.replace(
        /boutiqueboarding(?![a-zA-Z0-9])/g,
        '<a href="https://instagram.com/boutiqueboarding?igshid=MmIzYWVlNDQ5Yg==" class="links">boutiqueboarding</a>'
    )

    return replacedWithIgLink.replace(
        /boutiqueboardingco@gmail\.com/g,
        '<a href="mailto:boutiqueboardingco@gmail.com" class="links">boutiqueboardingco@gmail.com</a>'
    )
}

/**
 * Scrolls smoothly to the HTML element with the specified section ID on the current page
 * @param sectionId - The numeric ID of the section to scroll to
 */
export const scrollToSection = (sectionId: number): void => {
    const sectionElement = document.getElementById(`section-${sectionId}`)
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' })
    } else {
        console.warn(`Element with ID "section-${sectionId}" not found.`)
    }
}
