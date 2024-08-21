
## Published link : https://stock-photos-ishaq.netlify.app/


# Pexels Photo Search and Wishlist

## Overview
This application allows users to search for photos using the Pexels API, view similar photos in a carousel, and add or remove photos from a favorites list (wishlist). It also includes a modal for displaying author details of the top search result.



## Pseudocode

### HTML Structure
1. **Header Section**
   - Contains navigation bar with links to "SHOP" and "COMMUNITY".
   - Displays a logo image.
   - Includes icons for user profile, search, and shopping cart.

2. **Poster Section**
   - Displays a background image (poster).
   - Overlays text including the title "Stock Photos" and a description.
   - Includes an "Explore" button.

3. **Search Section**
   - Input field for entering search queries.
   - Search button to trigger the photo search.

4. **First Result Section**
   - Displays the top result image from the search.
   - Includes a hidden author detail paragraph, shown when a button is clicked.

5. **Similar Results Section**
   - Carousel (Splide) that displays similar photo results.
   - Each photo includes a heart button to add the photo to the wishlist.

6. **Wishlist Section**
   - Displays photos added to the wishlist.
   - Each wishlist item includes a heart button to remove the photo from the wishlist.

7. **Author Modal**
   - Modal to display the photographer's name and photo when triggered.

### CSS Styling
1. **Global Styles**
   - Set box-sizing, margin, padding, and font-family for the entire page.

2. **Header Styles**
   - Style the navigation bar and icons.
   - Set logo image size and layout of the navigation elements.

3. **Poster Section Styles**
   - Set the width and height of the poster image.
   - Position the text content over the image using absolute positioning.

4. **Search Section Styles**
   - Style the search input and button, including hover effects.

5. **First Result Styles**
   - Center-align the first result image.
   - Apply box-shadow and border-radius for styling.

6. **Similar Results (Splide Carousel) Styles**
   - Set layout and positioning for carousel images.
   - Style the heart button for adding/removing from wishlist.

7. **Wishlist Section Styles**
   - Use flexbox to wrap and display wishlist items.
   - Apply consistent styling with similar result images.

8. **Modal Styles**
   - Position the modal to cover the screen.
   - Style the modal content and close button.

### JavaScript Logic

1. **Page Initialization**
   - When the DOM content is loaded, fetch curated photos from the Pexels API.
   - Display the top result and similar photos in the carousel.

2. **Search Functionality**
   - When the search button is clicked:
     - Get the search query from the input field.
     - Validate the input (ensure it's not empty).
     - Fetch photos based on the query from the Pexels API.
     - Display the first photo result.
     - Display similar photos in the carousel.

3. **Display First Result**
   - Set the source and alt attributes of the first result image.
   - Attach an event listener to the "Show Author Details" button to open a modal with the author details.

4. **Display Similar Results**
   - Iterate over the fetched photos.
   - Create a carousel slide for each photo, including a heart button.
   - Attach event listeners to the heart buttons to handle adding/removing photos from the wishlist.

5. **Add to Wishlist**
   - When a photo is added to the wishlist:
     - Remove the photo from the carousel.
     - Append the photo to the wishlist container.
     - Attach an event listener to the heart button to handle removal from the wishlist.

6. **Remove from Wishlist**
   - When a photo is removed from the wishlist:
     - Remove the photo from the wishlist container.
     - Re-add the photo to the carousel with the appropriate event listener.

7. **Open Modal**
   - When the "Show Author Details" button is clicked:
     - Populate the modal with the photographer’s name and image.
     - Display the modal.
     - Attach event listeners to close the modal when the close button is clicked or when the user clicks outside the modal.

### Responsive Design
1. **Mobile View**
   - Use media queries to adjust the layout and size of elements for smaller screens.
   - Ensure the carousel and wishlist items are displayed correctly on mobile.

2. **Large Screens**
   - Ensure proper alignment and spacing of elements on larger screens.
   - Maintain a consistent look and feel across different screen sizes.

### API Integration
1. **Pexels API**
   - Fetch curated photos on page load.
   - Fetch photos based on user search query.
   - Extract relevant information like photo URLs, photographer name, etc.

### Dependencies
- **Splide.js**: For the image carousel.
- **Pexels API**: For fetching images.
- **FontAwesome**: For icons.
- **Tailwind CSS**: For utility-first CSS styling.

### Conclusion
This pseudocode provides a detailed structure of the application, ensuring a clear understanding of the project flow and implementation details. The application integrates the Pexels API for photo searching, utilizes Splide.js for the carousel functionality, and implements responsive design to cater to different screen sizes.
