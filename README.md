This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## To serve the storing uploaded images on in the cloud (AWS S3)

##### 1. Create an AWS account

In order to use AWS S3, you need an AWS account. You can create one here.

##### 2. Create a S3 bucket

Once you created an account (and you logged in), you should navigate to the S3 console to create a so-called "bucket".

"Buckets" are containers that can be used to store files (side-note: you can store any files - not just images).

Every bucket must have a globally unique name, hence you should become creative. You could, for example, use a name like **<your-name>-nextjs-demo-users-image**.

I'll use maxschwarzmueller-nextjs-demo-users-image in this example here.

When creating the bucket, you can confirm all the default settings - the name's the only thing you should set.

##### 3. Upload the dummy image files

Now that the bucket was created, you can already add some files to it => The dummy images that were previously stored locally in the public/images folder.

To do that, select your created bucket and click the "Upload" button. Then drag & drop those images into the box and confirm the upload.

![test](/assets/images/tutorials/2023-12-05_16-08-04-6bfba34e3c75a4d22777d0f78186caa4.jpg)

Thereafter, all those images should be in the bucket:

![/assets/images/tutorials/2023-12-05_16-08-04-10f2210199bbbd7e4e28dea2f86f8438.jpg]

##### 4. Configure the bucket for serving the images

Now that you uploaded those dummy images, it's time to configure the bucket such that the images can be loaded from the NextJS website.

Because, by default, this is not possible! By default, S3 buckets are "locked down" and the files in there are secure & not accessible by anyone else.

But for our purposes here, we must update the bucket settings to make sure the images can be viewed by everyone.

To do that, as a first step, click on the "Permissions" tab and "Edit" the "Block public access" setting:

![Configure the bucket for serving the images](https://github.com/fuwhis/next14-foodlover/blob/feat/uploaded-image-with-awsS3/assets/images/tutorials/2023-12-05_16-16-13-182f4df18025905a2bb63d40d9649228.jpg)

Then, disable the "Block all public access" checkbox (and with it, all other checkboxes) and select "Save Changes".

Type "confirm" into the confirmation overlay once it pops up.

That's not all though - as a next (and final step), you must add a so-called "Bucket Policy". That's an AWS-specific policy document that allows you to manage the permissions of the objects stored in the bucket.

You can add such a "Bucket Policy" right below the "Block all public access" area, still on the "Permissions" tab:

Click "Edit" and insert the following bucket policy into the box:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": [
                "arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"
            ]
        }
    ]
}
```

Replace `DOC-EXAMPLE-BUCKET` with your bucket name (maxschwarzmueller-nextjs-demo-users-image in my case).

Then, click "Save Changes".

Now the bucket is configure to grant access to all objects inside of it to anyone who has a URL pointing to one of those objects.

Therefore, you should now of course not add any files into the bucket that you don't want to share with the world!

To test if everything works, click on one of the images you uploaded (in the bucket).

Then click on the "Object URL" - if opening it works (and you can see the image), you configured everything as needed.

![Alt text](https://github.com/fuwhis/next14-foodlover/blob/feat/uploaded-image-with-awsS3/assets/images/tutorials/2023-12-05_16-24-53-464554545d10936f87d523715350d1f0.jpg?raw=true)

##### 5. Update the NextJS code to use those S3 images
