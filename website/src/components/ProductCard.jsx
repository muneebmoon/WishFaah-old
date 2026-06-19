import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';

const ProductCard = ({
  id,
  name,
  price,
  salePrice,
  image,
  altText = 'Product image',
  rating = 0,
  reviews = 0,
  isNew = false,
  isSoldOut = false,
  onAddToCart,
  onQuickView,
  onWishlist,
  className = '',
}) => {
  const hasSale = salePrice && salePrice < price;
  const discountPercentage = hasSale 
    ? Math.round(((price - salePrice) / price) * 100) 
    : 0;

  return (
    <div 
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}
      style={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#F6F0D7] aspect-square">
        {/* Product Image */}
        <Link href={`/product/${id}`} className="block w-full h-full">
          <Image
            src={image}
            alt={altText}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span 
              className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg animate-pulse"
              style={{ backgroundColor: '#89986D' }}
            >
              NEW
            </span>
          )}
          {hasSale && (
            <span 
              className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg"
              style={{ backgroundColor: '#C5D89D' }}
            >
              -{discountPercentage}%
            </span>
          )}
          {isSoldOut && (
            <span 
              className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg"
              style={{ backgroundColor: '#4A5A3A' }}
            >
              SOLD OUT
            </span>
          )}
        </div>

        {/* Action Buttons - Visible on Hover */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onAddToCart && onAddToCart(id)}
            disabled={isSoldOut}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#89986D' }}
          >
            <FiShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Quick Action Icons - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => onWishlist && onWishlist(id)}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#F6F0D7]"
            aria-label="Add to wishlist"
          >
            <FiHeart size={16} style={{ color: '#89986D' }} />
          </button>
          <button
            onClick={() => onQuickView && onQuickView(id)}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#F6F0D7]"
            aria-label="Quick view"
          >
            <FiEye size={16} style={{ color: '#89986D' }} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Product Name */}
        <Link href={`/product/${id}`} className="block">
          <h3 
            className="text-sm font-medium line-clamp-2 hover:text-[#89986D] transition-colors duration-200"
            style={{ color: '#4A5A3A' }}
          >
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <FiStar
                  key={index}
                  size={14}
                  className={index < Math.floor(rating) ? 'fill-current' : ''}
                  style={{ 
                    color: index < Math.floor(rating) ? '#C5D89D' : '#D1D5DB',
                    fill: index < Math.floor(rating) ? '#C5D89D' : 'none'
                  }}
                />
              ))}
            </div>
            {reviews > 0 && (
              <span className="text-xs" style={{ color: '#9CAB84' }}>
                ({reviews})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          {hasSale ? (
            <>
              <span className="text-lg font-bold" style={{ color: '#89986D' }}>
                ${salePrice.toFixed(2)}
              </span>
              <span className="text-sm line-through opacity-60" style={{ color: '#4A5A3A' }}>
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold" style={{ color: '#4A5A3A' }}>
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Mobile Add to Cart Button - Visible only on mobile */}
        <button
          onClick={() => onAddToCart && onAddToCart(id)}
          disabled={isSoldOut}
          className="w-full md:hidden flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#9CAB84' }}
        >
          <FiShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none group-hover:border-[#C5D89D] transition-colors duration-300"></div>
    </div>
  );
};

export default ProductCard;