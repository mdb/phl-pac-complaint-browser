require 'aws-sdk'

desc "Create an AWS S3 bucket"
task :s3_bucket, :bucket_name do |task, args|
  s3 = AWS::S3.new(region: 'us-east-1')

  bucket = s3.buckets.create(args[:bucket_name])

  bucket.configure_website do |config|
    config.index_document_suffix = 'index.html'
    config.error_document_key = 'error/index.html'
  end
end
