//
//  FBLiveStatusLiveActivity.swift
//  FBLiveStatus
//
//  Created by Addin Gama Bertaqwa on 20/09/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct FBLiveStatusAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct FBLiveStatusLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FBLiveStatusAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension FBLiveStatusAttributes {
    fileprivate static var preview: FBLiveStatusAttributes {
        FBLiveStatusAttributes(name: "World")
    }
}

extension FBLiveStatusAttributes.ContentState {
    fileprivate static var smiley: FBLiveStatusAttributes.ContentState {
        FBLiveStatusAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: FBLiveStatusAttributes.ContentState {
         FBLiveStatusAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: FBLiveStatusAttributes.preview) {
   FBLiveStatusLiveActivity()
} contentStates: {
    FBLiveStatusAttributes.ContentState.smiley
    FBLiveStatusAttributes.ContentState.starEyes
}
