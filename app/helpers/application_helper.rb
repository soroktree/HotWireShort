module ApplicationHelper
    def prepend_flash
        turbo_stream.prepend 'turbo_flash', partial: 'shared/flash'
    end
end
