package com.bilditplatform.rnflybuylivestatus

import android.graphics.Color

class LiveStatusOptions {
    var iconName: String? = null
    var statusTintColor: Int? = null
    var statusTintDarkModeColor: Int? = null

    fun setIconName(icon: String?): LiveStatusOptions {
        this.iconName = icon
        return this
    }

    fun setStatusTintColor(color: Int): LiveStatusOptions {
        this.statusTintColor = color
        return this
    }

    fun setStatusTintDarkModeColor(color: Int): LiveStatusOptions {
        this.statusTintDarkModeColor = color
        return this
    }
} 