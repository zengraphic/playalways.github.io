function cleanWhiteSpaces($domElementCollection) {
    $domElementCollection
        .each(function() {
            var $currentElement = r$(this);
            var elementContent = $currentElement.text();
            elementContent = elementContent.replace(/\s+/g, '');
            if (elementContent == ' ') {
                elementContent = '';
            }
            $currentElement
                .text(elementContent);
        });

}
