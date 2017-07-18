require 'spec_helper'

# nginx
describe file('/etc/nginx/sites-available/backend.conf') do
  it { should be_file }
end
describe service('nginx') do
  it  { should be_running }
end
describe command('service nginx configtest') do
  its(:exit_status) { should eq 0 }
end

# td-agent
describe file('/etc/td-agent/conf.d/forward.conf') do
  it { should be_file }
end
describe service('td-agent') do
  it  { should be_running }
end
describe command('service td-agent configtest') do
  its(:exit_status) { should eq 0 }
end

# other
describe file('/opt/ripre/ripre_healthcheck.sh') do
  it { should be_file }
  it { should be_mode 755 }
end
describe file('/etc/cron.d/ripre_healthcheck') do
  it { should be_file }
end
