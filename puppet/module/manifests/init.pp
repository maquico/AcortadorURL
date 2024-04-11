class nodejs_setup {
  class { 'nodejs':
    repo_url_suffix => '18.x', 
  }
}
include nodejs_setup


