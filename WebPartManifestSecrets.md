# Professional SPFx Solutions: Unlocking the secrets of your web part manifest

[SharePoint Framework](https://aka.ms/spfx) (SPFx) is an extensibility model for Microsoft 365 enabling developers to build different kinds of extensibility for Microsoft Viva, Microsoft Teams, Outlook, Microsoft 365 app (Office), and SharePoint. SPFx has multiple benefits like automatic Single Sign On, automatic hosting in the customer tenant, reuse same code across the service and industry standard web stack tooling.

*   _I prefer to use SVG images to create scalable assets that look good at any resolution. Is it possible to use SVG icons for my web parts?_
*   _How can I build web parts that look less “custom”, and more professional to encourage people in my organization to use my web parts?_
*   _How can I prepare my web part to publish it to the marketplace?_
*   _How do I control how my web parts show in the **Add a new web part** toolbox?_

Great questions! You can use your web part’s manifest to control how your web part appears (or doesn’t appear, in some cases) in the web part toolbox.

What is the web part manifest?[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#what-is-the-web-part-manifest)
-------------------------------------------------------------------------------------------------------------------------------------------------

Web part manifests are **.json** files that describe the web part, its capabilities, its default configuration, and how it should appear in the **Add a web part** toolbox.

Every web part in your SPFx solution has manifest file called **\[YourWebPartName\].manifest.json** next to the **\[YourWebPartName\].ts** file (where the code for your web part resides).

![A web part manifest in a solution](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/manifest-in-solution_hud277566c36f2727bc069614bda17b160_17804_700x0_resize_q100_h2_box_3.webp "A web part manifest in a solution")

The web part manifest is usually next to your web part code

A web part manifest must follow the [client-side web part manifest schema](https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json); if you ever wonder what values are allowed within the **.json** file, you can open your manifest and click the URL in the `$schema` node to find out the rules that your **.json** file must follow.

![The schema URL inside of a web part manifest.json](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/schema_hud5902cbe6c30e82ee9aed94d8596a881_17156_700x0_resize_q100_h2_box_3.webp "The schema URL inside of a web part manifest.json")

You can click on the schema URL to see the schema

The first time you open the manifest file with VSCode, you may notice that there are a few comments to help you out, but they are highlighted as errors. Don’t worry, you didn’t do anything wrong: technically, **.json** aren’t supposed to have comments, and VSCode likes to remind you of that fact… but you can safely ignore errors related to comments.

![A comment in a JSON file appearing as an error](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/jsonerror_huf434cdd7ef2f8ac71e41d7aab60d88b4_12518_700x0_resize_q100_h2_box_3.webp "A comment in a JSON file appearing as an error")

You can safely ignore errors related to comments

> If you don’t want VSCode to highlight comments as errors in your manifest, you can [follow this simple trick](https://tahoeninja.blog/posts/getting-rid-of-json-validation-errors-on-comments/)

A word about testing changes to your web part manifest[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#a-word-about-testing-changes-to-your-web-part-manifest)
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

If you want to try any of the changes described in this post while you’re running `gulp serve`, just remember that some changes require you to refresh the workbench page, while other changes will not appear until you start and stop `gulp serve` again.

Some other parts of your manifest (for example, the `properties` in the `preconfiguredEntries` node), require you to remove the web part from the page, refresh the page, and re-add the web part before your changes take effect.

Web parts can have pre-configured properties such as title, description, toolbox group name and icons, which all affect _how_ a web part appears in the toolbox.

You’ll find these properties in the `preconfiguredEntries` section of your manifest – because page authors and/or organization admins will have the ability to change the values you provide here as needed.

### `title`[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#title)

*   The `title` property controls the name of your web part in the toolbox.
    
*   Required
    
*   It should clearly describe the information the web part presents, instead of _what_ it does.
    
*   Avoid including the words “web part” – they’re all web parts!
    
*   `title` is a localizable string: you can have a different title value for every locale you wish to support, but you _must_ have a `default` value. For example:
    
```json
  "preconfiguredEntries": [{
    ...
    "title": {
        "default": "Color wheel",
        "en-ca": "Colour wheel",
        "fr-fr": "Roue chromatique"
      },
    ...
  }]

```

    

![Web part title in grid view](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/title_hua170a7a9d12647d0f964b16d446e1ad1_25351_700x0_resize_q100_h2_box_3.webp "Web part title in grid view")

Web part title in the toolbox grid view

![Web part title in list view](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/titlethumbnail_hu5c3115487cb7588fe213f083f5e41386_20945_700x0_resize_q100_h2_box_3.webp "Web part title in list view")

Web part title in the toolbox list view

*   You should consider making the `title` property configurable through the web part’s property page; even better, you should use the [WebPartTitle](https://pnp.github.io/sp-dev-fx-controls-react/controls/WebPartTitle/) PnP Reusable React control to allow page authors to easily change the web part title.

### `description`[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#description)

*   The `description` property is another localizable string that briefly describes the web part’s functionality and value description. For example, here are some descriptions of the standard SharePoint web parts:
    
    

* Web part: Call to action
  * description: Add call to action text and an image paired with a clickable button.
* Web part: Divider
  * description: Add a line to divide areas on your change.
* Web part: Image
  * description: Add an image, picture or photo to your page including text overlays and ability to crop and resize images.
* Web part: Spacer
  * description: Add vertical space between areas on the page.

    
*   Required
    
*   This value will be displayed to the user in the toolbox.
    
*   This value will be searchable, even if it is not displayed in the toolbox grid view.
    
*   A dictionary must contain a `default` key, but can support more locales, as needed.
    

```json
"preconfiguredEntries": [{
...
"description": { "default": "Add an interactive color wheel to your page." },
...
}]

```

    
*   This description should be used in the Toolbox tooltip and other display areas.
    
*   The organization admin and page author will have the ability to change this description as to suit their needs.
    
*   Don’t confuse the `description` field with the `description` under `properties`; one is the web part’s description, the other is a sample property that is created when scaffolding your web part.
    
    ![Two descriptions in a JSON file](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/two-descriptions_hu86dfc6dc946e03d728fcf7bd9bf84d0f_62825_700x0_resize_q100_h2_box_3.webp "Two descriptions in a JSON file")
    

![A web part description](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/description_hu36bca83da1ddf053376c10c97d734449_15252_700x0_resize_q100_h2_box_3.webp "A web part description")

### `groupId`[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#groupid)

*   The `groupId` is a GUID that determines which modern group to place the web part in the toolbox.
    
*   Required
    
*   The SharePoint Framework reserves group ids for predefined groups:
    
    

* Group Id: cf066440-0614-43d6-98ae-0b31cf14c7c3
  * Group Name: Text, media, and content
  * Description: Includes web parts that display text, multi-media, documents, information from the web, and other rich content.
* Group Id: 1edbd9a8-0bfb-4aa2-9afd-14b8c45dd489
  * Group Name: Documents, lists, and libraries
  * Description: Includes web parts that organize, group, and filter content to help users discover information.
* Group Id: 75e22ed5-fa14-4829-850a-c890608aca2d
  * Group Name: Feeds
  * Description: Includes web parts that facilitate information sharing, team work, and social interactions.
* Group Id: 1bc7927e-4a5e-4520-b540-71305c79c20a
  * Group Name: News, people and events
  * Description: Includes web parts that empower team productivity with the use of planning and process tools.
* Group Id: 4aca9e90-eff5-4fa1-bac7-728f5f157b66
  * Group Name: Data Analysis
  * Description: Includes web parts for tracking and analyzing data, and for integrating business flow with pages.
* Group Id: cfc8bda5-cb9b-49e3-8526-2ee6e52b256a
  * Group Name: Regional information
  * Description: Includes web parts that display information based on current region and geographical location.
* Group Id: 5c03119e-3074-46fd-976b-c60198311f70
  * Group Name: Advanced
  * Description: Includes web parts not in other categories.

    
*   You can use any of the predefined groups, or specify your own.
    
*   If you specify an id that is not in the predefined groups, your web part will appear in the **Advanced** group.
    

> If you want to support hosting your web part in a classic page, remember to also set the `group` property. If you do not provide one, your web part will appear in the miscellaneous group.

### `tags`[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#tags)

*   This field is used to tag a web part with keywords that are different from the web part group name, title and description. Tags can be used when searching of web parts.
    
*   It is an array that can contain up to 10 string values:
    
```json
  "preconfiguredEntries": [{
    ...
    "tags": [
      "Hue",
      "Saturation",
      "Pantone",
      "Grayscale",
      "RGB"
    ],
    ...
  }]

```

    

### `officeFabricIconFontName`, `iconImageUrl`, and `fullPageAppIconImageUrl`[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#officefabriciconfontname-iconimageurl-and-fullpageappiconimageurl)

There are two types of icons:

*   **Web part icon:** displayed in the Toolbox, defined by `officeFabricIconFontName` or `iconImageUrl`.
    
    ![Toolbox icon](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/toolboxicon_hu2644dcca3e3e24ac0df91d757ebe2454_11416_700x0_resize_q100_h2_box_3.webp "Toolbox icon")
    
*   **App page icon:** Displayed when users created a single part app page. Defined by `fullPageAppIconImageUrl`.
    
    ![Single part app page](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/singleparticon_hu5e29b7e7c089d3e81df3a099bc3e8c47_96489_700x0_resize_q100_h2_box_3.webp "Single part app page")
    

Here is how to use each of the `officeFabricIconFontName`, `iconImageUrl`, and `fullPageAppIconImageUrl` icon attributes:



* Attribute: officeFabricIconFontName
  * Description: The icon for the Web Part, to be displayed in the toolbox, represented as a character name in the Microsoft 365 icon font file. If this field has a value, the iconImageUrl field will be ignored.
  * Accepted values: The icon font is specified at https://aka.ms/uifabric-icons (but you can also use https://flicon.io)
  * Dimensions: N/A
* Attribute: iconImageUrl
  * Description: The icon for the WebPart, to be displayed in the toolbox, represented an image URL.
  * Accepted values: Absolute URL or base64-encoded data URL
  * Dimensions: 64x64px
* Attribute: fullPageAppIconImageUrl
  * Description: The icon for the Application pages, to be displayed in the single part app page experience, represented an image URL. The image at the URL should be approximately . If this field is not defined then the iconimageUrl is used instead
  * Accepted values: Absolute URL
  * Dimensions: 195x110px


*   To avoid quality loss, you may want to use vector-based SVG images.
*   Keep in mind that you have to deploy your web part icon images separately (or host them on a CDS somewhere). However, if you use base64-encoded images, you don’t need to deploy them separately.
*   To encode PNG images, you can use one of the many online resources (like [this one](https://www.base64-image.de/)).
*   If you choose to use a base64-encoded SVG for the `iconImageUrl` property, you may want to use this [handy interactive blog post](https://tahoeninja.blog/posts/fixing-base64-svg-icons-in-spfx/) to do the hard work for you.
*   At least one of `officeFabricIconFontName`, `iconImageUrl`, or `fullPageAppIconImageUrl` is required.

You may see conflicting information about the `fullPageAppIconImageUrl` recommended image sizes. The placeholder for the image is actually 193x158px, but the bottom 48px will be partially covered by a label with the web part’s name, hence the suggest 195x110px.

### `properties`[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#properties)

Every Web Part is expected to have some custom properties. For example, an image web part may have the image URL and caption text as custom properties, while a list web part may have the list id and list title as custom properties, and so on.

The image web part would have the following `properties`:

```json
"preconfiguredEntries: [{
        "properties": {
            "imageUrl": "https:\/\/somerandomurl.com",
            "caption": "This is a sample image"
        }
    },
]

```


While the list web part would have the following `properties`:

```json
"preconfiguredEntries: [{
        "properties": {
            "listId": "{3032A5BFC8E14DF88724104FD84890AB}",
            "title": "My events"
        }
    },
]

```


You can create properties of the following types:

*   Array
*   Boolean
*   Integer
*   Number
*   Object (in the form of a JSON structure)
*   string

> Remember: these values are “pre-configured” values. Your page authors and admins may want to change the values. You may want to use default values that will improve the “first run experience”, or leave the `properties` blank and handle blank values in your code, and use the [Placeholder](https://pnp.github.io/sp-dev-fx-controls-react/controls/Placeholder/) PnP Reusable React control to encourage the page authors to configure the web part.

Having more than one entry in `preconfiguredEntries`[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#having-more-than-one-entry-in-preconfiguredentries)
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

By default, there is only one `preconfiguredEntries`, but you can have more than one!

For example, let’s pretend that the same code for my Color wheel web part also allows me to find complementary colors and calculate contrast ratios, depending on a custom property called “mode”. I could use the following `preconfiguredEntries` values in my manifest:

```json
"preconfiguredEntries": [
    {
      "groupId": "5c03119e-3074-46fd-976b-c60198311f70", // Advanced
      "group": {
        "default": "Advanced"
      },
      "title": {
        "default": "Color wheel"
      },
      "description": {
        "default": "Add an interactive color wheel to your page."
      },
      "officeFabricIconFontName": "Color",
      "tags": [
        "Hue",
        "Saturation",
        "Pantone",
        "Grayscale"
      ],
      "properties": {
        "mode": "ColorWheel"
      }
    },
    {
      "groupId": "5c03119e-3074-46fd-976b-c60198311f70", // Advanced
      "group": {
        "default": "Advanced"
      },
      "title": {
        "default": "Complementary colors"
      },
      "description": {
        "default": "Add an interactive tool to find complementary colors."
      },
      "officeFabricIconFontName": "BucketColor",
      "properties": {
        "mode": "Complementary"
      }
    },
    {
      "groupId": "5c03119e-3074-46fd-976b-c60198311f70", // Advanced
      "group": {
        "default": "Advanced"
      },
      "title": {
        "default": "Contrast ratios"
      },
      "description": {
        "default": "Add an interactive tool to calculate contrast ratios between two colors."
      },
      "officeFabricIconFontName": "Contrast",
      "properties": {
        "mode": "Accessibility"
      }
    }
  ]

```


Which would produce three web parts in the toolbox:

![One manifest, three web parts](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/images/threewebparts_hu8fb8f3acc391b08daa32d41e3867a2c0_18349_700x0_resize_q100_h2_box_3.webp "One manifest, three web parts")

One manifest, three web parts

There’s more…[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#theres-more)
--------------------------------------------------------------------------------------------------------------

I hope that you learned a few things about the web part manifest that will help you build more “professional”-looking web parts.

We only covered the `preconfiguredEntries` today, but we still need to cover the attributes that describe the web part’s behaviors and capabilities – which we’ll discuss in tomorrow’s post.

References[](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/#references)
----------------------------------------------------------------------------------------------------------

Here are some initial references to get started with the SPFx in your development. Please do provide us with feedback and suggestions on what is needed to help you to get started with the SPFx development for Microsoft 365.

*   SPFx documentation – [https://aka.ms/spfx](https://aka.ms/spfx)
*   Issues and feedback around SPFx - [https://aka.ms/spfx/issues](https://aka.ms/spfx/issues)
*   Microsoft 365 Platform Community – [https://aka.ms/m365/community](https://aka.ms/m365/community)
*   Public SPFx and other Microsoft 365 platform community calls – [https://aka.ms/m365/calls](https://aka.ms/m365/calls)
    *   These calls are for everyone to take advantage to stay up to date on the art of possible within Microsoft 365 and to provide guidance for beginners and more advance users.
*   SPFx samples in the Microsoft 365 Unified Sample gallery – [https://aka.ms/m365/samples](https://aka.ms/m365/samples)

* * *

We will provide more details on the different options and future direction of the SPFx in upcoming blog posts in this series.

# Professional SPFx Solutions: More web part manifest secrets

[SharePoint Framework](https://aka.ms/spfx) (SPFx) is an extensibility model for Microsoft 365 enabling developers to build different kinds of extensibility for Microsoft Viva, Microsoft Teams, Outlook, Microsoft 365 app (Office), and SharePoint. SPFx has multiple benefits like automatic Single Sign On, automatic hosting in the customer tenant, reuse same code across the service and industry standard web stack tooling.

*   _How do I make my web part span the whole width of the page?_
*   _Can I hide a web part from the toolbox?_
*   _How can I make my web parts theme-aware?_
*   _Can I make my custom properties searchable?_
*   _Where do I control whether a web part shows up in Teams tabs, personal apps, full page apps, and Teams meeting apps?_

Great questions! Luckily, the answers to all your questions are the same: you can use your web part’s manifest to control your web part behaviors.

[What’s this “manifest” thing you’re talking about, again?](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#whats-this-manifest-thing-youre-talking-about-again)
---

Every web part **.ts** file in your SPFx solution has a matching **.manifest.json** file, which describe your web part and its capabilities.

In our [previous post](https://pnp.github.io/blog/post/spfx-19-professional-solutions-web-part-manifest/), we discussed how to use the web part manifest to control how your web part will appear in the **Add a new web part** toolbox; in today’s post, we’ll discuss how to use the manifest to control your web part’s capabilities and behavior.

> Remember: if you decide to test some of the settings discussed in this post on your own web parts, you may have to stop and restart `gulp serve`, and refresh the workbench page before the changes take effect. In some cases, you may need to remove the web part from your workbench and add it again after refreshing the workbench page.

Defining your web part capabilities[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#defining-your-web-part-capabilities)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Unless otherwise specified, all the properties discussed here should be added (if they don’t already exist) to the root of your **.manifest.json**, as indicated in this sample **.json**

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json",
  "id": "0d53f472-3cf6-4f40-b1de-a2ec7d2b03c4",
  "alias": "SampleMetadataWebPart",
  "componentType": "WebPart",

  "version": "*",
  "manifestVersion": 2,

  // Add properties here
  ...
}

```


### `supportedHosts`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#supportedhosts)

*   Indicates which “hosts” your web part supports.
    
*   Should be an array of the following possible values:
    
    
| Value              | Host type                    |
| ------------------ | ---------------------------- |
| SharePointFullPage | Single Part App Page         |
| SharePointWebPart  | SharePoint Page              |
| TeamsTab           | Microsoft Teams Tab          |
| TeamsPersonalApp   | Microsoft Teams Personal App |
| TeamsMeetingApp    | Teams Meeting App            |

    
*   If not provided, the default will be `SharePointFullPage`
    
*   This value controls which hosts will show your web part in the web part toolbox. It does not automatically make you web part work with the host types. Depending on what `supportedHosts` values you provide, you may have to add some code to your web part to make it work. For example, if your web part supports `TeamsMeetingsApp`, `TeamsTab`, and `SharePointWebPart` you may want to add code to your web part’s `render` method to act differently depending on where it is running:
    
```json
if (this.context.sdks.microsoftTeams) {
  if (this.context.sdks.microsoftTeams.context.meetingId) {
    // We are running in the context of a meeting
  } else {
    // We are running in the context of a Teams tab
  }
} else {
  // We are running it a SharePoint page
}

```
    
### `supportsThemeVariants`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#supportsthemevariants)

![Section background](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/images/sectionbackground.gif "Section background")

*   Indicates if your web part supports the theme variant experience.
    
*   `true` means that your web part should be aware of the section background where it sits, and will notify your web part when colors change.

    
```json
{
  // ...

  "supportsThemeVariants": true,

  "version": "*",
  "manifestVersion": 2,

  "requiresCustomScript": false,

  "preconfiguredEntries": [{
    // ...
  }]
}

```

    
*   Does not take effect until you restart `gulp serve` and reload the page (trust me, I learned this the hard way!)
    
*   Don’t forget that, depending on which template you used when scaffolding your web part, you may need to add code to your web parts ([React](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/supporting-section-backgrounds#use-the-background-color-awareness-in-react-based-web-parts) and [non-React](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/supporting-section-backgrounds#use-the-background-color-awareness-in-non-react-web-parts)) to make your web part adjust when the background color changes.
    

### `supportsFullBleed`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#supportsfullbleed)

*   Communication site pages offer an additional section layout named Full-width section. This layout spans the full width of the page without any horizontal margin or padding.
    
    ![Full width section](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/images/fullbleed_hu76c118eb2d653f2e2d43a1478fc3bf47_99864_700x0_resize_q100_h2_box_3.webp "Full width section")
    
*   When you set `supportsFullBleed` to `true`, you enable your web part to support full-width section, and it will show up in the toolbox for full width sections.
    
```json
{
  // ...

  "supportsFullBleed": true,

  "version": "*",
  "manifestVersion": 2,

  "requiresCustomScript": false,

  "preconfiguredEntries": [{
    // ...
  }]
}

```

    
    ![Full bleed web parts](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/images/fullwidthwebparts_hu20288e3df409adca8a358a4983abc9f1_229110_700x0_resize_q100_h2_box_3.webp "Full bleed web parts")
    
    Custom web parts listed in full width section
    
*   Without `supportsFullBleed`, your web part will add extra padding around the content (highlighted in red in the picture below):
    
    ![Padding around web part](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/images/webpartpadding_hu93c5491ea05813d79885aa4e56fff120_88923_700x0_resize_q100_h2_box_3.webp "Padding around web part")
    
    Padding shown in red
    
*   With `"supportsFullBleed": true`, your web part will reduce the padding:
    
    ![No padding](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/images/nopadding_hub6601046aa98ff56f4d479831317e351_99798_700x0_resize_q100_h2_box_3.webp "No padding")
    
    See mom?! No padding!
    

### `hiddenFromToolbox`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#hiddenfromtoolbox)

*   If you ever want to deploy a web part, but you don’t want page authors to add them to a page (for example, when you have a series of web parts that are connected via dynamic properties), you can set `hiddenFromToolbox` to `true` to hide your web part from the toolbox.
    
```json
{
  // ...

  "hiddenFromToolbox": true,

  "version": "*",
  "manifestVersion": 2,

  "requiresCustomScript": false,

  "preconfiguredEntries": [{
    // ...
  }]
}

```

    
*   You can still add the web part to a page (for example, by using the fantastic [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/sample-scripts/spo/add-custom-clientside-webpart-to-modern-page/)) even if the web part is hidden from the toolbox.
    

### `requiresCustomScript`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#requirescustomscript)

*   You may create web parts that allows users to upload files that potentially include scripts, or that allow users to write scripts that may execute when the web part is rendered.
    
*   By default, script is allowed on most sites that admins create, but it is not allowed on OneDrive, users-created sites, modern team and communication sites, and on the root site for your organization.
    
*   For security reasons, Global Administrators or Microsoft 365 SharePoint Administrators can [disable or enable custom scripts](https://learn.microsoft.com/sharepoint/allow-or-prevent-custom-script)
    
*   If your web part requires the ability to execute custom scripts, you can set the `requiresCustomScript` property to `true`; this will hide your web part from the toolbox on sites where custom scripts are disabled.
    
```json
{
  // ...

  "requiresCustomScript": true,

  "version": "*",
  "manifestVersion": 2,

  "preconfiguredEntries": [{
    // ...
  }]
}

``` 

### `disabledOnClassicSharepoint`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#disabledonclassicsharepoint)

*   SPFx web parts can also work on classic SharePoint pages (I know, right?!)
    
*   If you ever want to prevent page authors from adding your web part on classic pages, set `disabledOnClassicSharepoint` to `true`:
    
```json
{
  // ...

  "disabledOnClassicSharepoint": true,

  "version": "*",
  "manifestVersion": 2,

  "preconfiguredEntries": [{
    // ...
  }]
}

```

    

Imagine this scenario: your web part allows authors to set the web part title and the content of the web part, which renders as a beautiful process diagram; Your web part stores the configurable values in the `title` and `process` properties.

An author uses your web part to create an employee onboarding process diagram – which is frequently used by everyone in your organization.

One day, a manager needs to find the onboarding process, but can’t remember where that fancy diagram web part is. And searching for the title of the web part, or any of the content listed in the body of the web part yields no results. And they are _frustrated_.

Users of your web part see a pretty diagram. They don’t know that it isn’t content directly added to the page, or that it isn’t something that’s stored in a Visio diagram, or a PowerPoint document – they just want to find your web part by the content of the custom properties in your web part.

Luckily, you can set some manifest properties to help SharePoint understand your custom web part properties, and integrate with it.

Here are some useful properties you should consider:

### `searchablePropertyNames`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#searchablepropertynames)

*   Contains a list of custom property names that need to be indexed for search.
    
*   For example, our `title` and `process` properties would be listed as follows:
    
```json
{
  // ...

  "searchablePropertyNames": ["title", "process"],

  "version": "*",
  "manifestVersion": 2,

  "preconfiguredEntries": [{
    "title": "title goes here",
    "process": "Enter your process markup here"
  }]
}
```

    
*   By default, properties are not indexed for search unless you add them to `searchablePropertyNames`
    
*   Try to only list the human readable properties. For example, let’s say that your property contains HTML content and you make it searchable; users working in a furniture company may search for the word **table**, but may find results where your web part contains `<table>` tags – which would be very frustrating. Instead, you may want to store the HTML in a `content` property, parse out the HTML and extract the plain text, and store it in a `contentplaintext` property (but you would never display it). You would make the `contentplaintext` searchable instead of the `content` property.
    

### `linkPropertyNames`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#linkpropertynames)

*   When you use properties that contain hyperlinks (for example, where you store a link to a document stored in SharePoint), you can tell SharePoint the properties that contain links so that – if you move the document (or your web part) to a different location – SharePoint will attempt to fix up the links automatically.
    
*   Contains an array of strings with the property names of custom properties containing hyperlinks.
    
*   Link fixup is a SharePoint feature to help make sure SharePoint internal links in the content are correct. Pages and content can be moved around within SharePoint site hierarchy.
    
```json
{
  // ...

  "linkPropertyNames": ["documentUrl", "learnMoreLink"],

  "version": "*",
  "manifestVersion": 2,

  "preconfiguredEntries": [{
    "documentUrl": "Shared documents/process.docx",
    "learnMoreLink: "https://yourprocessgoeshere.com"
  }]
}

```
   

### `imageLinkPropertyNames`[](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#imagelinkpropertynames)

*   Stores an array of property names that contain URLs to images.
    
*   When images are moved, or your web part is moved, link fixup can automatically repair the URLs.
    
*   SharePoint will also automatically generate scaled and optimized images, and CDN URL of the images stored in the properties listed in `imageLinkPropertyNames`.
    
```json
{
  // ...

  "imageLinkPropertyNames": ["profileImage", "logoImage"],

  "version": "*",
  "manifestVersion": 2,

  "preconfiguredEntries": [{
    "profileImage": "assets/defaultprofile.png",
    "logoImage": "/sites/contoso/assets/logo.png"
  }]
}
```  

[Conclusion](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#conclusion)
---

The web part manifest is very powerful. You can control many aspects of your web part by setting various properties.

There are a few other settings that we didn’t get to cover; Don’t be afraid to explore the settings!

[References](https://pnp.github.io/blog/post/spfx-20-professional-solutions-more-web-part-manifest-secrets/#references)
-----------------------------------------------------------------------------------------------------------------------

Here are some initial references to get started with the SPFx in your development. Please do provide us with feedback and suggestions on what is needed to help you to get started with the SPFx development for Microsoft 365.

*   [SPFx documentation](https://aka.ms/spfx)
*   Issues and feedback around SPFx - [https://aka.ms/spfx/issues](https://aka.ms/spfx/issues)
*   Microsoft 365 Platform Community – [https://aka.ms/m365/community](https://aka.ms/m365/community)
*   Public SPFx and other Microsoft 365 platform community calls – [https://aka.ms/m365/calls](https://aka.ms/m365/calls)
    *   These calls are for everyone to take advantage to stay up to date on the art of possible within Microsoft 365 and to provide guidance for beginners and more advance users.
*   SPFx samples in the Microsoft 365 Unified Sample gallery – [https://aka.ms/m365/samples](https://aka.ms/m365/samples)

* * *

We will provide more details on the different options and future direction of the SPFx in upcoming blog posts in this series.


