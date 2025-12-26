# AI-Generated Images Guide for Estospaces Services

## Overview
This guide explains how to generate and integrate AI-generated images of professionals wearing Estospaces branded T-shirts for each service.

## Recommended AI Image Generation Tools

1. **DALL-E 3** (OpenAI) - https://openai.com/dall-e-3
2. **Midjourney** - https://www.midjourney.com
3. **Stable Diffusion** - https://stability.ai
4. **Leonardo.ai** - https://leonardo.ai
5. **Adobe Firefly** - https://firefly.adobe.com

## AI Prompt Template

Use this template for generating each service image:

```
Professional [SERVICE WORKER TYPE] wearing bright orange Estospaces branded T-shirt with logo visible, 
[SERVICE-SPECIFIC ACTION], high quality professional photography, natural lighting, 
friendly professional appearance, modern work environment, 4K resolution, detailed, 
photorealistic, commercial photography style
```

## Service-Specific Prompts

### 1. Boiler Repair
```
Professional heating technician wearing bright orange Estospaces branded T-shirt with logo, 
fixing boiler system in modern home, high quality professional photography, natural lighting, 
friendly professional appearance, 4K, detailed, photorealistic
```

### 2. Washing Machine Repair
```
Professional appliance repair technician wearing bright orange Estospaces branded T-shirt with logo, 
fixing washing machine in residential setting, high quality professional photography, 
natural lighting, friendly professional appearance, 4K, detailed, photorealistic
```

### 3. House Cleaning
```
Professional cleaner wearing bright orange Estospaces branded T-shirt with logo, 
cleaning modern house interior, vacuuming and organizing, high quality professional photography, 
natural lighting, friendly professional appearance, 4K, detailed, photorealistic
```

### 4. Plumbing
```
Professional plumber wearing bright orange Estospaces branded T-shirt with logo, 
doing plumbing work under kitchen sink, high quality professional photography, 
natural lighting, friendly professional appearance, 4K, detailed, photorealistic
```

### 5. House Painting
```
Professional painter wearing bright orange Estospaces branded T-shirt with logo, 
painting house interior wall with roller brush, high quality professional photography, 
natural lighting, friendly professional appearance, 4K, detailed, photorealistic
```

### 6. Pickup & Movers
```
Professional mover wearing bright orange Estospaces branded T-shirt with logo, 
moving furniture boxes into moving truck, high quality professional photography, 
natural lighting, friendly professional appearance, 4K, detailed, photorealistic
```

### 7. Garden Cleaning
```
Professional gardener wearing bright orange Estospaces branded T-shirt with logo, 
maintaining garden with gardening tools, trimming plants, high quality professional photography, 
natural lighting, friendly professional appearance, 4K, detailed, photorealistic
```

## Image Requirements

- **Dimensions**: 800x600 pixels (or higher resolution)
- **Format**: JPG or PNG
- **Aspect Ratio**: 4:3 or 16:9
- **File Size**: Optimized for web (under 500KB recommended)
- **Branding**: Estospaces logo clearly visible on T-shirt
- **Color**: Bright orange T-shirt (#FF7700)

## Integration Steps

1. Generate images using one of the recommended AI tools
2. Download the generated images
3. Upload images to your image hosting service (e.g., Cloudinary, AWS S3, or your CDN)
4. Update the `image` property in the `availableServices` array in:
   `src/app/user/dashboard/services/page.tsx`

## Example Update

Replace:
```typescript
image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
```

With:
```typescript
image: "https://your-cdn.com/images/services/boiler-repair-estospaces.jpg",
```

## Tips for Best Results

1. **Consistent Style**: Use the same AI tool and similar prompts for all services to maintain visual consistency
2. **Logo Placement**: Ensure the Estospaces logo is clearly visible on the T-shirt
3. **Professional Appearance**: Generate images with friendly, professional-looking people
4. **Background**: Use clean, modern work environments that match the service type
5. **Lighting**: Prefer natural, well-lit environments
6. **Diversity**: Consider generating images with diverse professionals

## Testing

After updating images:
1. Clear browser cache
2. Test image loading on all service cards
3. Verify images display correctly on mobile and desktop
4. Check that fallback placeholders work if images fail to load


