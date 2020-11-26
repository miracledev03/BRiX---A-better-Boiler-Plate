jQuery(document).ready(function() {
    var itemContainer = $('.shopping-cart__content ul');
    class CartItem {
      constructor(product) {
        this._product = Object.freeze(product);
        this._quantity = 0;
        this._elem = $($('#shopping-cart__item-template').html());
        $('.shopping-cart__item__image', this._elem).css(
          'background-image',
          "url('" + product.image + "')"
        );
        var link = $('.shopping-cart__item__link', this._elem);
        link
          .text(product.name)
          .attr('href', link.data('link-prefix') + product.id);
        this._container = itemContainer;
        this._priceElem = this._elem.find('.shopping-cart__item__price');
        this._quantityElem = this._elem.find('.shopping-cart__item__quantity');
      }
      _updateElem() {
        if (this.quantity <= 0 && this._elem[0].isConnected) {
          this._elem.remove();
        } else if (this.quantity > 0 && !this._elem[0].isConnected) {
          this._container.append(this._elem);
          this._elem.data('product', this.product);
        }
        this._elem.data('quantity', this.quantity);
        this._quantityElem.text(this.quantity.toString());
        this._priceElem.text(
          this._priceElem
            .data('currency-format')
            .replace('42', this.quantity * this._product.price)
        );
      }
      get product() {
        return this._product;
      }
      set product(newValue) {
        if (newValue.id !== this._product.id) {
          throw new Error("Can't set product to a different one");
        }
        this._product = Object.freeze(newValue);
        this._updateElem();
      }
      get quantity() {
        return this._quantity;
      }
      set quantity(newValue) {
        this._quantity = newValue;
        this._updateElem();
      }
    }
    class ShoppingCart {
      constructor() {
        this.load();
      }
      _findItem(product) {
        var item;
        var i = 0;
        for (i = 0; i < this._items.length; i++) {
          if (
            this._items[i] === product ||
            this._items[i].product.id === product.id
          ) {
            item = this._items[i];
            break;
          }
        }
        if (!item) {
          item = new CartItem(product);
          this._items.push(item);
        }
        return [item, i];
      }
      add(product, quantity) {
        var item = this._findItem(product)[0];
        item.quantity += quantity;
        this.save();
        this.update();
      }
      setQuantity(product, quantity) {
        if (quantity <= 0) {
          return this.remove(product);
        }
        this._setQuantityInternal(product, quantity);
        this.save();
        this.update();
      }
      _setQuantityInternal(product, quantity) {
        var item = this._findItem(product)[0];
        item.quantity = quantity;
      }
      remove(product) {
        var ret = this._findItem(product);
        ret[0].quantity = 0;
        this._items.splice(ret[1], 1);
        this.save();
        this.update();
      }
      update() {
        var num = 0;
        var price = 0;
        this._items.forEach(function(x) {
          num += x.quantity;
          price += x.quantity * x.product.price;
        });
        $('.shopping-cart__number-of-items')
          .text(num.toString())
          .toggleClass('shopping-cart--has-item', num > 0);
        var totalPriceElem = $('.shopping-cart__total_price');
        totalPriceElem.text(
          totalPriceElem.data('currency-format').replace('42', price)
        );
      }
      refresh() {
        if (!this._items.length) {
          return;
        }
        var self = this;
        return $.ajax({
          url:
            $('.shopping-cart').data('checkout-url') +
            '?action=refresh_cart&ids=' +
            this._items
              .map(function(x) {
                return x.product.id;
              })
              .join(','),
          dataType: 'text',
        }).pipe(
          function(resp) {
            var m = /data-call-result=["']([^'"]+)["'][^>]*>(.+?)<\/script>\s*<!--\s*\1/.exec(
              resp
            );
            if (!m) {
              console.error('Failed to extract cart data from response', resp);
              return;
            }
            var data = JSON.parse(m[2]);
            var map = [];
            data.forEach(function(x) {
              map[x.id.toString()] = x;
            });
            [].concat(self._items).forEach(function(item) {
              var id = item.product.id.toString();
              if (map[id]) {
                item.product = map[id];
              } else {
                self.remove(item.product);
              }
            });
            self.save();
          },
          function(xhr, e, status) {
            console.error('Failed to refresh cart:', xhr, e, status);
          }
        );
      }
      getPaymentRequest() {
        var self = this;
        return this.refresh().pipe(function() {
          return {
            action: 'pay',
            items: self._items.map(function(x) {
              return {
                token: x.product.token,
                quantity: x.quantity,
              };
            }),
          };
        });
      }
      clear() {
        this._items = [];
        this.save();
        itemContainer.children().remove();
        this.update();
      }
      isEmpty() {
        return !this._items.length;
      }
      save() {
        var data = JSON.stringify(
          this._items.map(function(x) {
            return {
              product: x.product,
              quantity: x.quantity,
            };
          })
        );
        try {
          sessionStorage.setItem('hubShopCart', data);
        } catch (e) {}
        try {
          localStorage.setItem('hubShopCart', data);
        } catch (e) {}
      }
      load() {
        this._items = [];
        itemContainer.children().remove();
        var self = this;
        try {
          var data = JSON.parse(
            sessionStorage.getItem('hubShopCart') ||
              localStorage.getItem('hubShopCart') ||
              '[]'
          );
          data.forEach(function(x) {
            self._setQuantityInternal(x.product, x.quantity);
          });
        } catch (e) {
          console.error('Failed to load shopping cart data:', e);
        }
        this.update();
      }
    }
    var cart = new ShoppingCart();
    window.__ShoppingCart = cart;
    $(document).on('click', '.shopping-cart__open', function(e) {
      e.preventDefault();
      $('body').addClass('shopping-cart--open');
    });
    $(document).on('click', '.shopping-cart__close', function(e) {
      e.preventDefault();
      $('body').removeClass('shopping-cart--open');
    });
    $(document).on('click', '.shopping-cart__add', function(e) {
      e.preventDefault();
      cart.add(JSON.parse($('#' + $(this).data('href')).html()), 1);
      $('body').addClass('shopping-cart--open');
    });
    $('.shopping-cart__content')
      .on('click', '.shopping-cart__item__actions__remove', function(e) {
        e.preventDefault();
        cart.remove(
          $(this)
            .closest('.shopping-cart__item')
            .data('product')
        );
      })
      .on('click', '.shopping-cart__item__actions__inc', function(e) {
        e.preventDefault();
        var item = $(this).closest('.shopping-cart__item');
        cart.setQuantity(item.data('product'), item.data('quantity') + 1);
      })
      .on('click', '.shopping-cart__item__actions__dec', function(e) {
        e.preventDefault();
        var item = $(this).closest('.shopping-cart__item');
        cart.setQuantity(item.data('product'), item.data('quantity') - 1);
      });
    if ($('.shopping-cart--refresh').length) {
      cart.refresh();
    }
  });
  