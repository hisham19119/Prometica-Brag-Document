
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AchievementProps } from '@/components/Achievement';

export const exportToPdf = async (title: string, achievements: AchievementProps[]) => {
  try {

    // Create a temporary div to render the document for export
    const tempDiv = document.createElement('div');
    tempDiv.className = 'pdf-export';
    tempDiv.style.width = '800px';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.color = '#333333';
    tempDiv.style.padding = '30px';
    // tempDiv.style.overflow = 'hidden';
    
    // Add header with logo-like element and title
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.marginBottom = '20px';
    header.style.borderBottom = '2px solid #8B5CF6';
    header.style.paddingBottom = '15px';
    

    
    // Add title to header
    const titleElement = document.createElement('h1');
    titleElement.innerText = title;
    titleElement.style.fontSize = '28px';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = '#403E43';
    titleElement.style.margin = '0';
    header.appendChild(titleElement);
    
    tempDiv.appendChild(header);
    
    // Add date
    const dateDiv = document.createElement('div');
    dateDiv.style.textAlign = 'right';
    dateDiv.style.fontSize = '12px';
    dateDiv.style.color = '#8A898C';
    dateDiv.style.marginBottom = '25px';
    
    const currentDate = new Date();
    dateDiv.innerText = `Generated on ${currentDate.toLocaleDateString()} at ${currentDate.toLocaleTimeString()}`;
    tempDiv.appendChild(dateDiv);
    
    // Add achievements
    achievements.forEach((achievement, index) => {
      const achievementDiv = document.createElement('div');
      achievementDiv.style.marginBottom = '30px';
      achievementDiv.style.padding = '20px';
      achievementDiv.style.borderRadius = '10px';
      achievementDiv.style.backgroundColor = '#faf9ff';
      // achievementDiv.style.backgroundColor = '#F1F0FB';
      achievementDiv.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
      achievementDiv.style.position = 'relative';
      achievementDiv.style.overflow = 'hidden';
      
      // Add decorative accent
      const accent = document.createElement('div');
      accent.style.position = 'absolute';
      accent.style.top = '0';
      accent.style.left = '0';
      accent.style.height = '100%';
      accent.style.width = '6px';
      
      // Choose different accent colors based on category
      let accentColor = '#8B5CF6'; // Default purple
      switch(achievement.category) {
        case 'Project':
          accentColor = '#0EA5E9'; // Blue
          break;
        case 'Skill':
          accentColor = '#F97316'; // Orange
          break;
        case 'Recognition':
          accentColor = '#8B5CF6'; // Purple
          break;
        case 'Leadership':
          accentColor = '#059669'; // Green
          break;
        case 'Innovation':
          accentColor = '#D946EF'; // Pink
          break;
        case 'Collaboration':
          accentColor = '#0284C7'; // Teal
          break;
      }
      accent.style.backgroundColor = accentColor;
      achievementDiv.appendChild(accent);
      
      // Title and starred indicator
      const titleContainer = document.createElement('div');
      titleContainer.style.display = 'flex';
      titleContainer.style.justifyContent = 'space-between';
      titleContainer.style.alignItems = 'flex-start';
      
      const achievementTitle = document.createElement('h2');
      achievementTitle.innerText = achievement.title;
      achievementTitle.style.fontSize = '18px';
      achievementTitle.style.fontWeight = 'bold';
      achievementTitle.style.marginBottom = '5px';
      achievementTitle.style.color = '#403E43';
      achievementTitle.style.paddingLeft = '10px';
      titleContainer.appendChild(achievementTitle);
      
      // Add star if achievement is starred
      if (achievement.starred) {
        const star = document.createElement('div');
        star.innerHTML = '★';
        star.style.color = '#F97316';
        star.style.fontSize = '18px';
        titleContainer.appendChild(star);
      }
      
      achievementDiv.appendChild(titleContainer);
      
      // Category badge and date
      const metaContainer = document.createElement('div');
      metaContainer.style.display = 'flex';
      metaContainer.style.alignItems = 'center';
      metaContainer.style.marginBottom = '15px';
      metaContainer.style.paddingLeft = '10px';
      
      const categoryBadge = document.createElement('span');
      categoryBadge.innerText = achievement.category;
      categoryBadge.style.fontSize = '11px';
      // categoryBadge.style.padding = '3px 8px';
      // categoryBadge.style.borderRadius = '12px';
      // categoryBadge.style.backgroundColor = accentColor + '20'; // 20% opacity
      categoryBadge.style.color = accentColor;
      categoryBadge.style.fontWeight = 'bold';
      metaContainer.appendChild(categoryBadge);
      
      const dateSeparator = document.createElement('span');
      dateSeparator.innerText = '•';
      dateSeparator.style.margin = '0 8px';
      dateSeparator.style.color = '#8A898C';
      metaContainer.appendChild(dateSeparator);
      
      const formattedDate = new Date(achievement.date).toISOString().split('T')[0];
      const dateSpan = document.createElement('span');
      dateSpan.innerText = formattedDate;
      dateSpan.style.fontSize = '12px';
      dateSpan.style.color = '#8A898C';
      metaContainer.appendChild(dateSpan);
      
      achievementDiv.appendChild(metaContainer);
      
      // Description with improved formatting
      const descriptionContainer = document.createElement('div');
      descriptionContainer.style.marginBottom = '15px';
      descriptionContainer.style.paddingLeft = '10px';
      descriptionContainer.style.fontSize = '14px';
      descriptionContainer.style.lineHeight = '1.6';
      descriptionContainer.style.color = '#403E43';
      // descriptionContainer.style.fontWeight = 'bold';
      
      // Format description text with bullet points if it contains line breaks
      const descriptionText = achievement.description;
      if (descriptionText.includes('\n')) {
        const paragraphs = descriptionText.split('\n').filter(p => p.trim() !== '');
        paragraphs.forEach(paragraph => {
          const p = document.createElement('p');
          p.style.margin = '8px 0';
          p.style.paddingLeft = '15px';
          p.style.position = 'relative';
          
          // Add bullet point
          const bullet = document.createElement('span');
          bullet.innerHTML = '•';
          bullet.style.position = 'absolute';
          bullet.style.left = '0';
          bullet.style.color = accentColor;
          p.appendChild(bullet);
          
          // Add paragraph text
          const textNode = document.createTextNode(' ' + paragraph);
          p.appendChild(textNode);
          
          descriptionContainer.appendChild(p);
        });
      } else {
        descriptionContainer.innerText = descriptionText;
      }
      
      achievementDiv.appendChild(descriptionContainer);
      
      // Impact (if exists) with improved formatting
      if (achievement.impact) {
        const impactSection = document.createElement('div');
        impactSection.style.marginTop = '15px';
        impactSection.style.paddingLeft = '10px';
        impactSection.style.borderTop = '1px dashed #D6BCFA';
        impactSection.style.paddingTop = '10px';
        
        const impactTitle = document.createElement('p');
        impactTitle.innerText = 'Impact:';
        impactTitle.style.fontSize = '14px';
        impactTitle.style.fontWeight = 'bold';
        impactTitle.style.marginBottom = '5px';
        impactTitle.style.color = '#7E69AB';
        impactSection.appendChild(impactTitle);
        
        const impactText = document.createElement('p');
        impactText.innerText = achievement.impact;
        impactText.style.fontSize = '14px';
        impactText.style.lineHeight = '1.6';
        impactText.style.color = '#403E43';
        impactText.style.fontStyle = 'italic';
        impactSection.appendChild(impactText);
        
        achievementDiv.appendChild(impactSection);
      }
      
      tempDiv.appendChild(achievementDiv);
    });
    
    // Add footer
    const footer = document.createElement('div');
    footer.style.marginTop = '30px';
    footer.style.borderTop = '1px solid #eee';
    footer.style.paddingTop = '15px';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'space-between';
    footer.style.fontSize = '10px';
    footer.style.color = '#9F9EA1';
    
    const footerLeft = document.createElement('span');
    footerLeft.innerText = 'Created with Prometica - Your Professional Achievement Tracker';

    // const footerRight = document.createElement('span');
    // footerRight.innerText = 'Page 1';
    
    footer.appendChild(footerLeft);
    // footer.appendChild(footerRight);
    tempDiv.appendChild(footer);
    const bottomSpacer = document.createElement('div');
bottomSpacer.style.height = '40px';
tempDiv.appendChild(bottomSpacer);
    
    document.body.appendChild(tempDiv);
    
    // Generate PDF from the temp div
    const canvas = await html2canvas(tempDiv, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (document, element) => {
        // Additional styling for the cloned element if needed
        element.style.height = 'auto';
        element.style.paddingBottom = '10px';
        
      }
    });
    
    document.body.removeChild(tempDiv);
    
    
    // const imgData = canvas.toDataURL('image/png');
    // const pdf = new jsPDF({
    //   orientation: 'portrait',
    //   unit: 'mm',
    //   format: 'a4'
    // });
    
    // const imgWidth = 210; // A4 width in mm
    // const imgHeight = canvas.height * imgWidth / canvas.width;
    // let position = 0;
    // let pageNumber = 1;
    
    // // Add multiple pages if content is longer than a page
    // while (position < imgHeight - 10) {
    //   if (position > 0) {
    //     pdf.addPage();
    //     pageNumber++;
    //   }
      
    //   // Add the image
    //   pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
      
    //   // Add page number at the bottom
    //   pdf.setFontSize(8);
    //   pdf.setTextColor(150, 150, 150);
    //   pdf.text(`Page ${pageNumber}`, 190, 287, { align: 'right' });
      
    //   position += 287; // A4 height in mm (297) minus some margin
    // }
    
    // const filename = `${title.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
    // pdf.save(filename);


    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const pageHeight = 297;
    const marginBottom = 10;
    const contentHeight = pageHeight - marginBottom;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    let position = 0;
    let pageNumber = 1;
    
    // main image in pixels
    const totalCanvasHeight = canvas.height;
    const totalCanvasWidth = canvas.width;

    // page height
    const pageCanvasHeight = contentHeight * (totalCanvasWidth / imgWidth);
    
    while (position < totalCanvasHeight) {
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = totalCanvasWidth;
      pageCanvas.height = Math.min(pageCanvasHeight, totalCanvasHeight - position);
    
      const pageCtx = pageCanvas.getContext('2d');
      pageCtx?.drawImage(
        canvas,
        0, position,
        totalCanvasWidth, pageCanvas.height,
        0, 0,
        totalCanvasWidth, pageCanvas.height
      );
    
      const pageImgData = pageCanvas.toDataURL('image/png');
      if (pageNumber > 1) pdf.addPage();
    
      pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, (pageCanvas.height * imgWidth) / totalCanvasWidth);
    
      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Page ${pageNumber}`, 200, 290, { align: 'right' });
    
      position += pageCanvasHeight;
      pageNumber++;
    }
       const filename = `${title.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
 
  }
};


